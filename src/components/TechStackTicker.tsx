

const techs = [
  { name: 'Python', icon: 'https://cdn.simpleicons.org/python' },
  { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript' },
  { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript' },
  { name: 'React', icon: 'https://cdn.simpleicons.org/react' },
  { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs' },
  { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker' },
  { name: 'Git', icon: 'https://cdn.simpleicons.org/git' },
  { name: 'Linux', icon: 'https://cdn.simpleicons.org/linux' },
  { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss' },
  { name: 'Power BI', icon: 'https://api.iconify.design/simple-icons:powerbi.svg?color=%23F2C811' },
  { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql' },
  { name: 'Arduino', icon: 'https://cdn.simpleicons.org/arduino' },
  { name: 'Bash', icon: 'https://cdn.simpleicons.org/gnubash' },
  { name: 'Figma', icon: 'https://cdn.simpleicons.org/figma' },
];

export function TechStackTicker() {
  return (
    <div className="w-full py-4 overflow-hidden relative">
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative bg-black/30 backdrop-blur-xl border border-white/5 rounded-xl py-4 overflow-hidden shadow-lg">
          <div className="flex gap-12 whitespace-nowrap animate-ticker items-center">
            {/* Multiplied for slower carousel feel if needed, but keeping the same animation */}
            {[...techs, ...techs, ...techs, ...techs].map((tech, index) => (
              <div 
                key={index} 
                className="flex items-center justify-center w-10 h-10 transition-all duration-500 hover:scale-125"
                title={tech.name}
              >
                <img 
                  src={tech.icon} 
                  alt={tech.name} 
                  className="w-7 h-7 object-contain"
                />
              </div>
            ))}
          </div>
          
          {/* Internal Gradients */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
