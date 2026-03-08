# Officers Migration Script

This directory contains scripts for migrating officer data to Contentful.

## Security Notice

**⚠️ IMPORTANT**: Officer contact information (emails and phone numbers) is stored in a separate data file that is **NOT committed to version control** for privacy reasons.

## Setup

1. Copy the template file:
   ```bash
   cp scripts/officers-data.template.json scripts/officers-data.json
   ```

2. Edit `scripts/officers-data.json` with actual officer information.

3. The `officers-data.json` file is automatically ignored by git (listed in `.gitignore`) to protect personal information.

## File Structure

- `migrate-officers.js` - Main migration script (safe to commit)
- `officers-data.template.json` - Template showing expected data structure (safe to commit)
- `officers-data.json` - **ACTUAL DATA** with personal info (ignored by git, **NOT safe to commit**)

## Running the Migration

```bash
node scripts/migrate-officers.js
```

The script will:
1. Load data from `officers-data.json`
2. Validate the data structure
3. Migrate officers to Contentful

## Data Structure

The `officers-data.json` file must contain:

- `boardOfDirectors` - Array of executive officers
- `directors` - Array of directors
- `advisors` - Array of advisors
- `pastPresidents` - Array of past presidents

See `officers-data.template.json` for the complete structure.

## Privacy Best Practices

- Never commit `officers-data.json` to version control
- Keep personal contact information secure
- Only share the template file in the repository
- Distribute actual officer data through secure channels
