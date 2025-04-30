// Mock data for password cards
const services = [
  {
    name: "Nodejs",
    iconUrl: "/placeholder.svg?height=60&width=60",
    color: "bg-green-600",
    status: "senha compartilhada",
  },
  {
    name: "Gmail",
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg",
    color: "bg-red-500",
    user: "Evandro Carvalho Ferreira",
  },
  {
    name: "Google Drive",
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg",
    color: "bg-yellow-500",
    user: "Evandro Carvalho Ferreira",
  },
  {
    name: "Flaticon",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
    color: "bg-blue-400",
    user: "Evandro Carvalho Ferreira",
  },
  {
    name: "Skype",
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/8/85/Skype_logo_icon.png",
    color: "bg-blue-500",
    user: "Evandro Carvalho Ferreira",
  },
  {
    name: "Dropbox",
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/7/78/Dropbox_Icon.svg",
    color: "bg-blue-600",
    user: "Evandro Carvalho Ferreira",
  },
  {
    name: "Netflix",
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    color: "bg-red-600",
    user: "Evandro Carvalho Ferreira",
  },
  {
    name: "Banco De Dados",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/148/148825.png",
    color: "bg-blue-400",
    status: "senha compartilhada",
  },
  {
    name: "Dribbble",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/5968/5968853.png",
    color: "bg-pink-500",
    status: "senha compartilhada",
  },
  {
    name: "Instagram",
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg",
    color: "bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-500",
    user: "Evandro Carvalho Ferreira",
    status: "social network",
  },
  {
    name: "YouTube",
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg",
    color: "bg-red-600",
    user: "Evandro Carvalho Ferreira",
  },
  {
    name: "GitHub",
    iconUrl: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    color: "bg-gray-800",
    status: "senha compartilhada",
  },
  {
    name: "LinkedIn",
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    color: "bg-blue-700",
    user: "Evandro Carvalho Ferreira",
  },
  {
    name: "Facebook",
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    color: "bg-blue-600",
    user: "Evandro Carvalho Ferreira",
    status: "social network",
  },
  {
    name: "Twitter",
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg",
    color: "bg-blue-400",
    user: "Evandro Carvalho Ferreira",
    status: "social network",
  },
  {
    name: "Microsoft",
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    color: "bg-gray-200",
    user: "Evandro Carvalho Ferreira",
  },
  {
    name: "AWS",
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    color: "bg-yellow-600",
    status: "senha compartilhada",
  },
  {
    name: "Evernote",
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Evernote_Icon.png",
    color: "bg-green-500",
    status: "meu bloco de notas",
  },
  {
    name: "Snapchat",
    iconUrl: "https://upload.wikimedia.org/wikipedia/en/c/c4/Snapchat_logo.svg",
    color: "bg-yellow-400",
    status: "social network",
  },
  {
    name: "TikTok",
    iconUrl: "https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg",
    color: "bg-black",
    status: "social network",
  },
]

// Function to generate random mock passwords
export function generateMockPasswords(count: number) {
  const passwords = []

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * services.length)
    const service = services[randomIndex]

    passwords.push({
      id: `password-${Date.now()}-${i}`,
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZHk7Fsy74PoYsE7BHftCgC2osEhlqC.png",
      iconUrl: service.iconUrl,
      name: service.name,
      user: service.user,
      status: service.status,
      color: service.color,
    })
  }

  return passwords
}
