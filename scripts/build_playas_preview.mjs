import {spawnSync} from 'node:child_process';

const routes=['/playas/','/playas/abrico/','/playas/arpoador/','/playas/barra-da-tijuca/','/playas/barra-de-guaratiba/','/playas/botafogo/','/playas/copacabana/','/playas/flamengo/','/playas/grumari/','/playas/ipanema/','/playas/joatinga/','/playas/leblon/','/playas/leme/','/playas/macumba/','/playas/pepe/','/playas/perigoso/','/playas/pontal/','/playas/praia-da-reserva/','/playas/praia-da-urca/','/playas/praia-do-diabo/','/playas/praia-do-secreto/','/playas/praia-dos-amores/','/playas/praia-vermelha/','/playas/praias-selvagens/','/playas/prainha-vidigal/','/playas/prainha/','/playas/recreio/','/playas/sao-conrado/'];
const result=spawnSync(process.execPath,['scripts/build_multilingual.mjs',`--routes=${routes.join(',')}`],{stdio:'inherit'});
process.exit(result.status ?? 1);
