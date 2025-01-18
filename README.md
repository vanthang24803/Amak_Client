## What is AMAK?

AMAK is an shopping web app for book written in NextJS(version >= 14) with TypeScript and TailwindCss.

### Technologies

- [x] [React](https://react.dev/) (v18.2.0)
- [x] [NextJs](https://nextjs.org/) (v14.2.15)
- [x] [Typescript](https://www.typescriptlang.org/) (>= v5)
- [x] [NodeJS](https://nodejs.org/en) (>= v20.16.0)
- [x] [TailwindCss](https://tailwindcss.com/)
- [x] [Sadcn UI](https://ui.shadcn.com/)
- [x] [Bun](https://bun.sh/)
- [x] [Zustand](https://github.com/pmndrs/zustand)
- [x] [Docker](https://www.docker.com/)
- [x] [CI/CD Github Actions](https://docs.github.com/en/actions)
- [x] [Nginx](https://nginx.org/en/)

### Roadmap

- [x] _~~Optimize performance for lazy loading~~_
- [x] _~~Preload data for better performance <= 2ms~~_
- [ ] Cover all features by integration test

### Prerequisites

To run the application, you will need to have the following installed on your machine:

- NodeJS >= 20.16.0: [Download and Install NodeJS](https://nodejs.org/en)
- Bun >= 1.1.27: [Download and Install Bun](https://bun.sh/)
- Git: [Download and Install Git](https://git-scm.com/downloads)

### Running Application

To run the application, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/vanthang24803/Amak_Client
   ```

2. Navigate to the project directory:

   ```bash
   cd AMAK_Client
   ```

3. Install the dependencies:

   ```bash
   sh setup.sh
   ```

4. Config environment file:

   ```bash
   sh env.local.sh
   ```

5. Lint the code:

   ```bash
   sh lint.sh
   ```

6. Build the application:

   ```bash
   sh build.sh
   ```

7. Run the project:

   ```bash
   sh run.sh
   ```

   PowerShell Terminal

   ```ps1
    run.ps1
   ```

## License

This project is licensed under the [MIT License](LICENSE).
