const path = require('path');
const projects = [
  { id: 'monde', name: 'Monde des Géographes', host: 'mondedesgeographes.lovable.app', product: false },
  { id: 'vacances', name: 'A Quand les Prochaines Vacances ?', host: 'aquandlesprochainesvacances.lovable.app', product: true },
  { id: 'sourichat', name: 'Sourichat.map', host: 'sourichatmap.lovable.app', product: false },
  { id: 'airports', name: 'Company Airports', host: 'companyairports.lovable.app', product: false },
];
function projectFor(url) {
  try { return projects.find((p) => p.host === new URL(url).hostname); } catch { return undefined; }
}
function iconFor(url) {
  const project = projectFor(url);
  return path.join(__dirname, 'build', project ? project.id + '.ico' : 'icon.ico');
}
module.exports = { projectFor, iconFor };