import projectsData from "../data/projects.json";

export const CONTACT = {
  whatsapp: "https://wa.me/5511977070209?text=Ol%C3%A1%20Thomas%2C%20vi%20seu%20portf%C3%B3lio%20e%20quero%20conversar%20sobre%20um%20projeto.",
};

export const PRODUCTION_PROJECTS = projectsData.map((project) => ({
  slug: project.id,
  name: project.title,
  domain: project.link.replace(/^https?:\/\//, "").replace(/\/$/, ""),
  liveUrl: project.link,
  image: "/og.webp",
  tagline: project.descricao,
  tech: project.tecnologias,
}));
