// src/components/auth/footer-links.tsx
export function FooterLinks() {
    const links = [
      "عن نص", "من نص", "المتروط والتحكم", 
      "سياسة الخصوصية", "تواصل معنا"
    ];
  
    return (
      <div className="flex flex-wrap justify-center gap-4 text-xs">
        {links.map((link, index) => (
          <a 
            key={index} 
            href="#" 
            className="text-gray-500 hover:text-green-600 transition-colors"
          >
            {link}
          </a>
        ))}
      </div>
    );
  }