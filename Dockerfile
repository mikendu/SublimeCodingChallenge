ARG NODE_IMAGE=node:14-alpine
ARG WORKDIR=/app

FROM $NODE_IMAGE as runtime_deps
ARG WORKDIR
WORKDIR ${WORKDIR}
COPY package.json ${WORKDIR}/package.json
COPY yarn.lock ${WORKDIR}/yarn.lock

EXPOSE 8080
USER $USER
CMD ["node", "dist/index.js"]

