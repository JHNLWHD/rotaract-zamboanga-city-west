
import { Users, Globe, Handshake, Award, Heart, Zap, Sparkles, Ribbon, Book, Star, Trophy } from 'lucide-react';

const iconMap = {
  ribbon: Ribbon,
  book: Book,
  star: Star,
  trophy: Trophy,
  none: Award, 
  award: Award, 
  globe: Globe, 
  community: Users,
  heart: Heart
};

const DynamicIcon = ({iconName, className = 'h-5 w-5'} : 
    {iconName: string; className?: string;}) => {

    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Award; 
    return <IconComponent className={className}/>
} 

export default DynamicIcon