import { createClient } from "redis";

export const client = createClient({
    password: 'KEvi4zQLVsdZlIjZpKVNjc8hlt4jwZD4',
    socket: {
        host: 'redis-13965.c308.sa-east-1-1.ec2.cloud.redislabs.com',
        port: 13965
    }
})
