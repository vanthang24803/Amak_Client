# Running the Application

This is a basic guide on how to run the AMAK Nextjs application.

## Prerequisites

To run the application, you will need to have the following installed on your machine:

- NodeJS >= 20.16.0: [Download and Install NodeJS](https://nodejs.org/en)
- Bun >= 1.1.27: [Download and Install Bun](https://bun.sh/) 
- Git: [Download and Install Git](https://git-scm.com/downloads)

## Environment
Setup env before run dockerfile:

```env.example
NEXT_PUBLIC_API_URL=
NODE_ENV=development
NEXT_PUBLIC_API_SOCKET=
NEXT_PUBLIC_URL=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_BUCKET=
NEXT_PUBLIC_FIREBASE_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=1
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
API_URL=
NEXT_PUBLIC_QR_IMAGE=
NEXT_PUBLIC_QR_KEY=
NEXT_PUBLIC_QR_ID=
NEXT_PUBLIC_QR_BANK_BIN=
NEXT_PUBLIC_QR_BANK_NAME=
NEXT_PUBLIC_QR_BANK_ID=
```

## Running Application

Build application

```bash
sh build.sh
```

Run application

```bash
sh run.sh
```

Build docker image

```bash
sh docker.sh "something"
```

## License

This project is licensed under the [MIT License](LICENSE).
