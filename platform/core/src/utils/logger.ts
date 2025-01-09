import { TConsoleMethod } from '../types';

const defaultName = '@ohif';
const defaultStyle = 'color: cyan; font-weight: bold;';
const defaultMethods: TConsoleMethod[] = ['log', 'info', 'trace', 'warn', 'debug', 'error'];

export class Logger {
  // A map of name: Logger
  private static instances: Record<string, Logger> = {};

  private readonly style: string;

  private name: string;
  private methods: TConsoleMethod[] = defaultMethods;

  constructor(
    name: string = defaultName,
    style: string = defaultStyle,
    methods: TConsoleMethod[] = defaultMethods
  ) {
    if (Logger.instances[name]) {
      throw new Error(
        `Logger with name ${name} already exists, 
        please use a different name or clone the existing logger.`
      );
    }

    this.name = name;
    this.style = style;
    this.setMethods(methods);

    Logger.registerInstance(this);
  }

  // Register each instance by guid to contain the instance and its prefix
  private static registerInstance(instance: Logger) {
    Logger.instances[instance.getName()] = instance;
  }

  private static unregisterInstance(instance: Logger) {
    delete Logger.instances[instance.getName()];
  }

  private static getInstance(name: string) {
    const instance = Logger.getInstance(name);
    if (!instance) {
      throw new Error(`Logger with name ${name} does not exist.`);
    }

    return instance;
  }

  private static getInstancesByPrefix(prefix: string): Logger[] {
    const filteredNames = Object.keys(Logger.instances).filter(name => name.startsWith(prefix));
    return filteredNames.map(name => Logger.instances[name]);
  }

  public static cloneLogger(name: string, nameExtension: string) {
    return Logger.getInstance(name).clone(nameExtension);
  }

  public static setLoggerMethods(name: string, methods: TConsoleMethod[]) {
    Logger.getInstance(name).setMethods(methods);
  }

  public static setPrefixMethods(prefix: string, methods: TConsoleMethod[]) {
    Logger.getInstancesByPrefix(prefix).forEach(instance => instance.setMethods(methods));
  }

  public log(...data: any[]) {}
  public info(...data: any[]) {}
  public trace(...data: any[]) {}
  public warn(...data: any[]) {}
  public debug(...data: any[]) {}
  public error(...data: any[]) {}

  // Get the current prefix
  public getName() {
    return this.name;
  }

  // Set a new prefix
  public setName(name: string) {
    Logger.unregisterInstance(this);
    this.name = name;
    Logger.registerInstance(this);
  }

  public getMethods() {
    return this.methods;
  }

  public setMethods(methods: TConsoleMethod[]) {
    this.methods = methods;

    // Restore the methods with the new methods
    methods.forEach(method => {
      this[method] = console[method].bind(console, `%c${this.name}`, this.style);
    });

    // Silence the methods that are not in the new methods
    defaultMethods.forEach(method => {
      if (!methods.includes(method)) {
        this[method] = () => {};
      }
    });
  }

  public silence(...methods: TConsoleMethod[]) {
    const toSilence = methods.length ? methods : defaultMethods;
    // Silence the methods that are not already silenced
    this.setMethods(this.methods.filter(method => !toSilence.includes(method)));
  }

  public restore(...methods: TConsoleMethod[]) {
    const toRestore = methods.length ? methods : defaultMethods;
    const silenced = toRestore.filter(method => !this.methods.includes(method));
    // Restore the methods that are not already in the current methods
    this.setMethods(this.methods.concat(silenced));
  }

  // Clone the current logger with a new name extension separated by '/',
  // eg clone('@ohif').clone('extension') will produce '@ohif/extension'
  public clone(nameExt: string) {
    return new Logger(`${this.name}/${nameExt}`, this.style, this.methods);
  }
}

export const defaultLogger = new Logger();
export default defaultLogger;
