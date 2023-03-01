# show this help text
default:
  @just --list --unsorted

# start dev server
dev:
  @yarn dev

# build production version
build:
  @yarn build

# start production version
start:
  @yarn start

# static page export
export:
  @yarn export

gen-db-types:
  @yarn gen-db-types
