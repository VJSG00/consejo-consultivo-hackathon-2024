import { Link } from 'react-router-dom';

interface ButtonProps {
    to: string;
    icon: React.ReactNode;
    text: string;
  }

export default function DashboardButton({ to, icon, text } : ButtonProps) {
    return (
        <Link to={to} className="flex items-center  justify-center p-4 bg-[#005d90] text-white rounded-sm shadow-md hover:bg-[#35a1da]">            {icon}
            <span className="ml-2 no-underline">{text}</span>
        </Link>
    );
};
