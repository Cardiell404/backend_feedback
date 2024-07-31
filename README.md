
# Listar pods:
`kubectl get pods`

# Mirar errores de pods:
`kubectl describe pod __NAME_POD__`

# Crear llaves secretas en kubernetes
`kubectl create secret generic jwt-secret --from-literal=JWT_KEY=__INGRESS__KEY__`
# Listar llaves secretas en kubernetes
`kubectl get secrets`

# Implementar nginx
`kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/mandatory.yaml`
`kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.7.1/deploy/static/provider/cloud/deploy.yaml `
`kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.7.1/deploy/static/provider/cloud/deploy.yaml`
`kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.7.1/deploy/static/provider/aws/deploy.yaml`
`kubectl create ingress demo --class=nginx --rule www.feedback.dev/=demo:80`
# Conectarse a un pod de kubernetes
`kubectl exec -it NAME_POD sh`

# Configurar puertos en kubernetes
`kubectl port-forward __NAME_POD__ PORT:PORT
`kubectl port-forward rabbitmq-depl-746f844c7d-slz8f 4222:4222`


# Reset NATS
`kubectl delete __NAME__POD`

# Actualizar dependencia de node
`npm update`