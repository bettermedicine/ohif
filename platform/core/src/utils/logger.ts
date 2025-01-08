import { TConsoleMethod } from '../types';
import guid from './guid';

const defaultPrefix = '@ohif';
const defaultStyle = 'color: cyan; font-weight: bold;';
const defaultMethods: TConsoleMethod[] = ['log', 'info', 'trace', 'warn', 'debug', 'error'];

type TPrefixedLogger = {
  instance: Logger;
  prefix: string;
};

export class Logger {
  // A map of guid: TPrefixedLogger
  // we can use this to globally modify all instances,
  // for example if we want to silence all loggers with a specific prefix
  private static instances: Record<string, TPrefixedLogger> = {};
  private static methods: TConsoleMethod[] = defaultMethods;

  public readonly guid: string;

  private readonly style: string;

  private prefix: string;
  private silencedMethods: TConsoleMethod[] = [];

  // Create a new instance of Logger with supplied methods, prefix, and style,
  // if not supplied the default prefix and style will be used.
  // The prefix will be seen in the console before each log message, eg:
  // @ohif: {message}
  constructor(prefix: string = defaultPrefix, style: string = defaultStyle) {
    this.prefix = prefix;
    this.style = style;
    this.guid = guid();

    Logger.registerInstance(this);

    // enable passed methods and disable the rest
    this.restore(...Logger.methods);
  }

  // Sets available methods for all instances
  public static setMethods(methods: TConsoleMethod[] = defaultMethods) {
    Logger.methods = methods;
  }

  // Register each instance by guid to contain the instance and its prefix
  private static registerInstance(instance: Logger) {
    Logger.instances[instance.guid] = {
      instance,
      prefix: instance.getPrefix(),
    };
  }

  public log(...data: any[]) {}
  public info(...data: any[]) {}
  public trace(...data: any[]) {}
  public warn(...data: any[]) {}
  public debug(...data: any[]) {}
  public error(...data: any[]) {}

  // Silence logger methods, if no methods are provided, silence all methods
  public silence(...methods: TConsoleMethod[]) {
    this.silencedMethods = methods;

    methods.length
      ? // silence only the supplied methods
        methods.forEach(method => (this[method] = () => {}))
      : // by default (no args), silence all methods
        Logger.methods.forEach(method => (this[method] = () => {}));
  }

  // Restore silenced methods, if no methods are provided, restore all methods
  public restore(...methods: TConsoleMethod[]) {
    if (methods.length) {
      this.silencedMethods = this.silencedMethods.filter(silenced => !methods.includes(silenced));
      methods.forEach(method => {
        this[method] = console[method].bind(console, `%c${this.prefix}`, this.style);
      });

      return;
    }

    // by default (no args), restore all possible methods
    this.silencedMethods = [];
    Logger.methods.forEach(method => {
      this[method] = console[method].bind(console, `%c${this.prefix}`, this.style);
    });
  }

  // Retrieve all active methods for this logger
  public activeMethods(): TConsoleMethod[] {
    return Logger.methods.filter(method => !this.silencedMethods.includes(method));
  }

  // Get the current prefix
  public getPrefix() {
    return this.prefix;
  }

  // Set a new prefix
  public setPrefix(prefix: string) {
    this.prefix = prefix;
    // since this logger has a new prefix, we need to register it again
    Logger.registerInstance(this);
    this.restore(...this.activeMethods());
  }

  // Add a prefix to the current prefix, separated by a slash
  public addPrefix(addPrefix: string) {
    this.setPrefix(`${this.prefix}/${addPrefix}`);
  }
}

export const logger = new Logger();
export default logger;
