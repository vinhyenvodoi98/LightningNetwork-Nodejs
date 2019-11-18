### Setup the simnet environment

```sh
scripts/simnet-setup.sh
```

### to get LND_MACAROON and LND_CERT run:

```sh
scripts/simnet-env.sh
```

then copy in .env

Để xem balance của wallet

```sh
docker-compose exec simnet-lnd-btcd-alice lncli --rpcserver=localhost:10009 --macaroonpath=~/.lnd/data/chain/bitcoin/simnet/admin.macaroon walletbalance
```

migrate btcd

```sh
docker-compose run simnet-btcctl generate 5 > /dev/null
```
