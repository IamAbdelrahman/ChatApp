# Chatting App (with Media & Voice)

A real-time chat application built with **Angular**, **ASP.NET Core**, and **Spring Boot**.  
Supports user authentication, chat history, real-time messaging, and future extensions like media sharing and voice notes.  

---

## 🚀 Tech Stack

### Frontend  
- **Angular** (VS Code)  
- RxJS for WebSocket handling  
- Reactive Forms for authentication  
- HTML + CSS (no external UI library for POC)

### Backend  
- **ASP.NET Core** → Stateless service (auth, users, history)  
- **Spring Boot** → Stateful service (WebSockets, real-time messaging)  
- **MongoDB** → Message & chat storage (NoSQL)  

### Other  
- WebSocket (STOMP protocol) for real-time communication  
- JWT-based authentication (planned)  
- Docker for local setup (planned)  

---

## 📂 Project Structure

- **backend-dotnet/** (ASP.NET Core - Visual Studio)  
  - ChatApp.API/ → Controllers (auth, history)  
  - ChatApp.Domain/ → Entities & business rules  
  - ChatApp.Infrastructure/ → DB, repositories  
  - ChatApp.Application/ → Application services  
  - ChatApp.sln  

- **backend-java/** (Spring Boot - Java)  
  - chat-service/ → WebSocket + real-time messaging  

- **frontend-angular/** (Angular - VS Code)  
  - src/app/  
    - auth/ → Login, register, change password  
    - chat/ → Chat list + chat window  
    - core/ → Shared services (auth, websocket)  
    - shared/ → Reusable components  
    - app.module.ts  

---

## 🏗 Development Phases

1. **Proof of Concept (PoC)**  
   - Two users exchange text messages in real-time via WebSocket.  

2. **Database Integration**  
   - Messages stored in MongoDB.  
   - Fetch chat history via REST (ASP.NET Core).  

3. **Frontend/Backend Collaboration**  
   - Angular connects to both backends:  
     - REST (login, history) → ASP.NET Core  
     - WebSocket (real-time chat) → Spring Boot  

4. **Future Enhancements**  
   - Media sharing (images, files, voice notes).  
   - Voice/video calls using WebRTC.  
   - End-to-end encryption.  

---

## ⚡ Getting Started

### Prerequisites  
- Node.js & Angular CLI  
- .NET 9 SDK  
- Java 17+ & Maven/Gradle  
- MongoDB  

### Clone the repository  
```bash
git clone https://github.com/IamAbdelrahman/ChatApp
cd chat-app
```
### Frontend (Angular)
```bash
cd frontend-angular
npm install
ng serve -o
```
#### Runs on: http://localhost:4200/

### Backend (.NET API)
```bash
cd backend-dotnet/ChatApp.API
dotnet run
```
#### Runs on: https://localhost:5001/

### Backend (Spring Boot)
```bash
cd backend-java/chat-service
./mvnw spring-boot:run
```
#### Runs on: http://localhost:8080/ (WebSocket: /ws)
