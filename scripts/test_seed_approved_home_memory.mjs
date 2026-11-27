#!/usr/bin/env node
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {extractLocaleObjects,mergeReviewedHome} from './seed_approved_home_memory.mjs';

const source=`const ES={title:"Río no se visita.","hero.lead":"Guía local: \\\"mi Río\\\"."};
const PT={title:"O Rio não se visita.","hero.lead":"Guia local: \\\"meu Rio\\\"."};
const EN={title:"Rio is not just visited.","hero.lead":"A local guide to \\\"my Rio\\\"."};
const FR={title:"Rio ne se visite pas.","hero.lead":"Un guide local de \\\"mon Rio\\\"."};`;
const objects=extractLocaleObjects(source);
assert.deepEqual(Object.keys(objects.ES),['title','hero.lead']);
const titleKey=crypto.createHash('sha256').update(objects.ES.title).digest('hex');
const leadKey=crypto.createHash('sha256').update(objects.ES['hero.lead']).digest('hex');
const existing={
 [titleKey]:{en:{text:'machine draft',status:'machine_unreviewed'},fr:{text:'human text',status:'reviewed'}},
 [leadKey]:{pt:{text:'older PT text',status:'reviewed_import'}}
};
const merged=mergeReviewedHome(existing,objects);
assert.equal(merged.sourceLocaleKeys,2);
assert.equal(merged.memory[titleKey].en.text,'Rio is not just visited.');
assert.equal(merged.memory[titleKey].en.status,'reviewed_import');
assert.equal(merged.memory[titleKey].fr.text,'human text');
assert.equal(merged.memory[leadKey].pt.text,'older PT text');
assert.equal(merged.memory[leadKey].en.text,'A local guide to "my Rio".');
assert.equal(merged.added,3);
assert.equal(merged.replacedDrafts,1);
assert.equal(merged.conflicts,2);
assert.equal(existing[titleKey].en.text,'machine draft');
assert.throws(()=>mergeReviewedHome([],objects),/memory must be a JSON object/);
console.log('APPROVED HOME MEMORY PASS: existing human strings preserved; machine drafts replaced; translation memory not mutated in place.');
