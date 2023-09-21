import { parse } from "yaml";

export function generate(ymlString: string) {
  const input = parse(ymlString);

  // if (!(input.generator.name === 'the-unsafe-env-generator' && input.generator.version === '1')) {
  //   return new Error('Version Mismatched');
  // }

  return Object.entries(input.variables).map(([ instanceName, tracks ]) => {
    const t = Object.entries(tracks as { [key: string]: string }).map(([ trackName, variables ]) => {
      const a = Object.entries(input.templates).map(([ appName, template ]) => {
        let t = template as string;
        Object.entries(variables).forEach(([ varName, value ]) => {
          t = t.replaceAll(`\$\{${varName}\}`, value);
        });
        return [
          appName,
          t
        ]
      })
      return [
        trackName,
        Object.fromEntries(a),
      ]
    })
    return [
      instanceName,
      Object.fromEntries(t)
    ]
  })

}