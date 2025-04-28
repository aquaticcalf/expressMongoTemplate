## karna

### install bun

for linux :

```sh
curl -fsSL https://bun.sh/install | bash
```

for windows :

```
powershell -c "irm bun.sh/install.ps1|iex"
```

### generate prisma client

```sh
bun generate
```

### run dev server

```sh
bun dev
```

### before pull request

```sh
bun biome
```

### seed your database

```sh
bun seed
```