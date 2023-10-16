import envData from '../env.json'
const Config = envData
// This is used to create single point of error if env.json gone missing
// instead of messing all imports...
export default Config