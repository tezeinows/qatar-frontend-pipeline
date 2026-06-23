# Qatar Frontend — EKS Deployment Pipeline

## Stack
- **Cluster:** qatar-cluster-frankfurt (eu-central-1)
- **ECR:** 701372699131.dkr.ecr.eu-central-1.amazonaws.com/qatar-front-end
- **Auth:** GitHub OIDC → AWS (no stored keys)

---

## One-Time Setup

### 1. Create the IAM Role

```powershell
# Create the role with trust policy
aws iam create-role `
  --role-name github-actions-qatar-deploy `
  --assume-role-policy-document file://iam-trust-policy.json

# Attach permissions policy
aws iam put-role-policy `
  --role-name github-actions-qatar-deploy `
  --policy-name qatar-deploy-policy `
  --policy-document file://iam-permissions-policy.json
```

### 2. Grant the IAM Role EKS Access

```powershell
# Add role as EKS access entry
aws eks create-access-entry `
  --cluster-name qatar-cluster-frankfurt `
  --region eu-central-1 `
  --principal-arn arn:aws:iam::701372699131:role/github-actions-qatar-deploy `
  --type STANDARD

# Attach edit policy (enough to deploy, not full admin)
aws eks associate-access-policy `
  --cluster-name qatar-cluster-frankfurt `
  --region eu-central-1 `
  --principal-arn arn:aws:iam::701372699131:role/github-actions-qatar-deploy `
  --policy-arn arn:aws:eks::aws:cluster-access-policy/AmazonEKSEditPolicy `
  --access-scope type=namespace,namespaces=qatar-frontend
```

### 3. Repo Structure

```
your-repo/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── html/
│   └── index.html        ← your HTML page goes here
├── nginx/
│   └── nginx.conf
├── k8s/
│   ├── deployment.yaml
│   ├── service.yaml
│   └── hpa.yaml
└── Dockerfile
```

### 4. Enable GitHub Environment Protection (optional but recommended)

Go to: GitHub repo → Settings → Environments → New environment → name it `production`
Add required reviewers so every deploy to production needs manual approval.

---

## How the Pipeline Works

1. Push to `main` triggers the workflow
2. GitHub assumes the AWS IAM role via OIDC (no stored secrets)
3. Docker image is built for `linux/amd64` and pushed to ECR with Git SHA tag
4. Image is scanned for CRITICAL vulnerabilities — pipeline fails if found
5. kubectl deploys to EKS with rolling update (zero downtime)
6. Rollout is verified — auto-rollback if pods don't become healthy within 120s

---

## Adding an Ingress (to expose publicly)

Once deployed, add an AWS Load Balancer Controller ingress:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: qatar-frontend-ingress
  namespace: qatar-frontend
  annotations:
    kubernetes.io/ingress.class: alb
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/target-type: ip
spec:
  rules:
    - http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: qatar-frontend-svc
                port:
                  number: 80
```
