# 📝 Full Stack (3 Tier) To-Do Application using K8s Ingress on AWS

A scalable full-stack To-Do List application built with:

- 🖥️ Frontend: HTML, CSS, JavaScript (`index.html`)
- ⚙️ Backend: Node.js + Express
- 🗃️ Database: MySQL
- 🐳 Dockerized services
- ☸️ Kubernetes: StatefulSet, Deployments, Services, Ingress, HPA
- ☁️ Hosted on AWS (EC2 or EKS)

---

## 📂 Project Structure

```bash
- k8s-ingress-fullstack-app
  - backend
    - .env
    - db.js
    - Dockerfile
    - index.js
    - package-lock.json
    - package.json
  - frontend
    - Dockerfile
    - index.html
  - k8s
    - backend
      - deployment.yml
      - hpa.yml
      - service.yml
    - frontend
      - deployment.yml
      - hpa.yml
      - service.yml
    - ingress
      - ingress.yml
    - mysql
      - service.yml
      - statefulset.yml
```

---

## 🚀 Features

- Add, fetch, update, and delete tasks
- RESTful API built with Express.js
- Automatic MySQL DB and table initialization
- Responsive UI using vanilla JS
- Dockerized backend and frontend
- Kubernetes:
  - Service + StatefulSet for MySQL
  - Service + Deployment + HPA for frontend and backend
  - ClusterIP Services
  - NGINX Ingress controller
- Scalable and cloud-native
- Hosted on AWS

---

## 🧰 Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Database:** MySQL
- **Infrastructure:** Docker, DockerHub, Kubernetes, Ingress, HPA, AWS

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/krunalbhandekar/k8s-ingress-fullstack-app.git
```

```bash
cd k8s-ingress-fullstack-app
```

### 2. Build docker images

```bash
docker build -t <your-dockerhub-username>/backend ./backend/
```

```bash
docker build -t <your-dockerhub-username>/frontend ./frontend/
```

### 3. Check Docker Images

```bash
docker images
```

| REPOSITORY                         | TAG    | IMAGE ID         | CREATED            | SIZE   |
| ---------------------------------- | ------ | ---------------- | ------------------ | ------ |
| <your-dockerhub-username>/backend  | latest | \***\*\*\*\*\*** | About a minute ago | 133MB  |
| <your-dockerhub-username>/frontend | latest | \***\*\*\*\*\*** | 10 seconds ago     | 48.2MB |

### 4. Push Docker Images to DockerHub

```bash
docker login
```

```bash
docker push <your-dockerhub-username>/backend
```

```bash
docker push <your-dockerhub-username>/frontend
```

### 5. Install NGINX Ingress Controller (if not installed)

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.9.4/deploy/static/provider/aws/deploy.yaml
```

Wait until the controller pods are running:

```bash
kubectl get pods -n ingress-nginx
```

### 6. Update Image Names in both Kubernetes Manifests (`deployment.yml`)

```bash
image: <your-dockerhub-username>/backend
```

and

```bash
image: <your-dockerhub-username>/frontend
```

Replace `<your_dockerhub_username>` with **your actual dockerhub username**

### 7. Apply Kubernetes Manifests (in order)

**Note:** Wait for each component to be fully running before proceeding.

- **7.1. MySQL (StatefulSet & Service)**

```bash
kubectl apply -f k8s/mysql
```

check mysql service and pods (wait till running)

```bash
kubectl get svc
```

```bash
kubectl get pods
```

- **7.2. Backend**

```bash
kubectl apply -f k8s/backend
```

```bash
kubectl get svc
```

```bash
kubectl get pods
```

- **7.3. Frontend**

```bash
kubectl apply -f k8s/frontend
```

```bash
kubectl get svc
```

```bash
kubectl get pods
```

- **7.4. Ingress**

```bash
kubectl apply -f k8s/ingress
```

Wait 2–3 minutes for the external IP to be assigned.

```bash
kubectl get ingress
```

You'll see an address like:

| NAME         | CLASS | HOSTS | ADDRESS                                                                              | PORTS | AGE |
| ------------ | ----- | ----- | ------------------------------------------------------------------------------------ | ----- | --- |
| html-ingress | nginx | \*    | **`a29f77032a45848e7afa19969c6057e8-23cb952f5dcd1f7e.elb.ap-south-1.amazonaws.com`** | 80    | 3m  |

**🌐 Access Your Application**

**🔗 URLs**

- **Frontend:**

http://<elb-address>

Example:
http://a29f77032a45848e7afa19969c6057e8-23cb952f5dcd1f7e.elb.ap-south-1.amazonaws.com

- **Backend API:**

http://<elb-address>/api

Example:
http://a29f77032a45848e7afa19969c6057e8-23cb952f5dcd1f7e.elb.ap-south-1.amazonaws.com/api

---

### 👨‍💻 Author

Maintained by **[Krunal Bhandekar](https://www.linkedin.com/in/krunal-bhandekar/)**

---
