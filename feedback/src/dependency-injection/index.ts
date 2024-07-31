import { YamlFileLoader } from 'node-dependency-injection';
import sharedContainer from './Shared/application';

const container = sharedContainer;
const loader = new YamlFileLoader(container);
const env = process.env.NODE_ENV || 'dev';
loader.load(`${__dirname}/application_${env}.yaml`)
export default container;