ARG NODE_IMAGE=node:14-alpine
ARG WORKDIR=/app

# Without this ignore line, hadolint will complain that FROM $NODE_IMAGE
# needs to have a tag, like FROM $NODE_IMAGE:14-alipne, but that
# doesn't make sense here because it already resolves to a tagged
# image from line 1. Same case on line 21.
# See https://github.com/hadolint/hadolint/issues/219
# hadolint ignore=DL3006
FROM $NODE_IMAGE as runtime_deps
ARG WORKDIR
WORKDIR ${WORKDIR}
COPY package.json ${WORKDIR}/package.json
COPY yarn.lock ${WORKDIR}/yarn.lock

EXPOSE 8080
USER $USER
CMD ["node", "dist/index.js"]

