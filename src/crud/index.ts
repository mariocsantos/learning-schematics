import { Rule, SchematicContext, Tree, url, apply, template, mergeWith } from '@angular-devkit/schematics';

import { Schema } from './schema';
import { strings } from '@angular-devkit/core';

export function crud(_options: Schema): Rule {
  return (_tree: Tree, _context: SchematicContext) => {

    // const config = readConfig(_tree);
    const config = {};

    const sourceParametrizedTemplates = renderTemplate(_options, config);

    return mergeWith(sourceParametrizedTemplates);
  };
}

// function readConfig(_tree: Tree) {
//   const buffer = _tree.read('./smn-schematics.json');

//   if (buffer) {
//     // TODO: Validate configs
//     return JSON.parse(buffer.toString('utf8'));
//   } else {
//     throw new SchematicsException('Error to read smn-schematics.json');
//   }
// }

function renderTemplate(_options: Schema, _config: any) {
  const sourceTemplates = url('./templates');

  const sourceParametrizedTemplates = apply(sourceTemplates, [
    template({
      ..._options,
      ...strings,
      ...{ _config },
      upperWithUderscore,
      findSharedModule
    })
  ]);

  return sourceParametrizedTemplates;
}

function upperWithUderscore(value: string): string {
  if (!value) {
    return '';
  }

  return strings.underscore(value).toUpperCase();
}

function findSharedModule(): string {
  return '';
}