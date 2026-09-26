// Cursos e certificações do currículo e do LinkedIn, com o título oficial (não
// traduzido).
// Ordem: .NET, back-end e arquitetura primeiro; depois o restante.
export type Course = {
  name: string;
  issuer: string;
};

export const courses: Course[] = [
  { name: "Formação .NET", issuer: "Alura" },
  { name: "ASP.NET Core Enterprise Applications", issuer: "Desenvolvedor.io" },
  { name: "REST com ASP.NET Core WebAPI", issuer: "Desenvolvedor.io" },
  {
    name: "Clean Architecture Essencial - ASP.NET Core com C#",
    issuer: "Udemy",
  },
  { name: "Formação de Arquiteto de Software", issuer: "Desenvolvedor.io" },
  { name: "Fundamentos de Microsserviços", issuer: "Desenvolvedor.io" },
  { name: "Docker essencial para plataforma .NET", issuer: "Udemy" },
  { name: "Docker do Zero ao Avançado", issuer: "Desenvolvedor.io" },
  { name: "Dominando os Testes de Software", issuer: "Desenvolvedor.io" },
  { name: "Dominando o Apache Kafka", issuer: "Desenvolvedor.io" },
  { name: "Formação SQL com Oracle Database", issuer: "Alura" },
  { name: "Redis: Armazenamento Chave Valor", issuer: "Alura" },
  { name: "Redis: Estrutura e Recursos na sua Base NoSQL", issuer: "Alura" },
  { name: "Formação Xamarin", issuer: "Alura" },
  { name: "Formação Full Stack Developer", issuer: "Desenvolvedor.io" },
  { name: "Formação Front-End Angular Expert", issuer: "Desenvolvedor.io" },
  {
    name: "Scrum Foundation Professional Certificate (SFPC)",
    issuer: "CertiProf",
  },
  { name: "Kanban", issuer: "CertiProf" },
  { name: "Jira Fundamentals Badge", issuer: "Atlassian" },
  {
    name: "Fundamentos na Lei Geral de Proteção de Dados",
    issuer: "CertiProf",
  },
];
