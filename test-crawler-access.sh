#!/bin/bash

# Test script to verify web archive crawler access after enabling Netlify Prerender
# Run this script after enabling the Netlify Prerender extension and redeploying

SITE_URL="https://rotaract.rotaryzcwest.org"
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "=========================================="
echo "Testing Web Archive Crawler Access"
echo "=========================================="
echo ""

# Test function
test_crawler() {
    local user_agent=$1
    local test_url=$2
    local description=$3
    
    echo -e "${YELLOW}Testing:${NC} $description"
    echo -e "${YELLOW}User-Agent:${NC} $user_agent"
    echo -e "${YELLOW}URL:${NC} $test_url"
    
    # Get the response
    response=$(curl -A "$user_agent" -s "$test_url")
    
    # Check if body contains actual content (not just empty root div)
    if echo "$response" | grep -q '<div id="root"></div>'; then
        if echo "$response" | grep -q '<div id="root"><'; then
            echo -e "${GREEN}✓ PASS${NC} - Content is being rendered"
        else
            echo -e "${RED}✗ FAIL${NC} - Only empty root div found (SPA not pre-rendered)"
        fi
    else
        echo -e "${GREEN}✓ PASS${NC} - Content is being rendered (no empty root div)"
    fi
    
    # Check for title tag
    title=$(echo "$response" | grep -o '<title>.*</title>' | head -1)
    if [ -n "$title" ]; then
        echo -e "${GREEN}✓${NC} Title found: $title"
    else
        echo -e "${RED}✗${NC} No title tag found"
    fi
    
    # Count content lines (should be more than 100 for pre-rendered content)
    line_count=$(echo "$response" | wc -l | tr -d ' ')
    echo "Response size: $line_count lines"
    
    if [ "$line_count" -gt 100 ] 2>/dev/null; then
        echo -e "${GREEN}✓${NC} Substantial content detected"
    else
        echo -e "${YELLOW}!${NC} Limited content (may not be pre-rendered)"
    fi
    
    echo ""
    echo "------------------------------------------"
    echo ""
}

# Test 1: Internet Archive crawler
test_crawler "ia_archiver" "$SITE_URL/" "Internet Archive (Homepage)"

# Test 2: Archive.org bot
test_crawler "Mozilla/5.0 (compatible; archive.org_bot +http://archive.org)" "$SITE_URL/projects" "Archive.org Bot (Projects Page)"

# Test 3: Wayback Machine
test_crawler "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/600.2.5 (KHTML, like Gecko) Version/8.0.2 Safari/600.2.5 (Applebot/0.1; +http://www.apple.com/go/applebot)" "$SITE_URL/events" "Applebot (Events Page)"

# Test 4: Generic crawler
test_crawler "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" "$SITE_URL/officers" "Googlebot (Officers Page)"

# Test 5: Check a dynamic project page
test_crawler "ia_archiver" "$SITE_URL/projects/regala-esperanza-3-in-1-project" "Internet Archive (Dynamic Project Page)"

# Test 6: Check a dynamic event page
test_crawler "archive.org_bot" "$SITE_URL/events/2025-06-12/basic-orientation-seminar-2025" "Archive.org Bot (Dynamic Event Page)"

echo "=========================================="
echo "Testing Complete"
echo "=========================================="
echo ""
echo "NEXT STEPS:"
echo "1. If tests show FAIL, ensure Netlify Prerender extension is enabled"
echo "2. Redeploy your site after enabling the extension"
echo "3. Wait 5-10 minutes for the deployment to complete"
echo "4. Run this script again to verify"
echo ""
echo "EXPECTED RESULTS (after enabling prerender):"
echo "- All tests should show PASS"
echo "- Response size should be 150+ lines for pre-rendered content"
echo "- Title tags should be present and specific to each page"
echo ""
