import CommandsManager from '../classes/CommandsManager';
import ExtensionManager from '../extensions/ExtensionManager';
import { defaultLogger, Logger } from '../utils';

export default class ServicesManager {
  public services: AppTypes.Services = {};
  public registeredServiceNames: string[] = [];
  public logger: Logger;
  private _commandsManager: CommandsManager;
  private _extensionManager: ExtensionManager;

  constructor(commandsManager: CommandsManager) {
    this._commandsManager = commandsManager;
    this._extensionManager = null;
    this.logger = defaultLogger.clone('ServicesManager');
    this.logger.debug('initializing');
    this.services = {};
    this.registeredServiceNames = [];
  }

  setExtensionManager(extensionManager) {
    this._extensionManager = extensionManager;
  }

  /**
   * Registers a new service.
   *
   * @param {Object} service
   * @param {Object} configuration
   */
  registerService(service, configuration = {}) {
    if (!service) {
      this.logger.warn('Attempting to register a null/undefined service. Exiting early.');
      return;
    }

    if (!service.name) {
      this.logger.warn(`Service name not set. Exiting early.`);
      return;
    }

    if (this.registeredServiceNames.includes(service.name)) {
      this.logger.warn(
        `Service name ${service.name} has already been registered. Exiting before duplicating services.`
      );
      return;
    }

    if (service.create) {
      this.services[service.name] = service.create({
        configuration,
        extensionManager: this._extensionManager,
        commandsManager: this._commandsManager,
        servicesManager: this,
        extensionManager: this._extensionManager,
      });
      if (service.altName) {
        // TODO - remove this registration
        this.services[service.altName] = this.services[service.name];
      }
    } else {
      this.logger.warn(`Service create factory function not defined. Exiting early.`);
      return;
    }

    this.logger.debug(`Service ${service.name} registered`);

    /* Track service registration */
    this.registeredServiceNames.push(service.name);
  }

  /**
   * An array of services, or an array of arrays that contains service
   * configuration pairs.
   *
   * @param {Object[]} services - Array of services
   */
  registerServices(services) {
    services.forEach(service => {
      const hasConfiguration = Array.isArray(service);

      if (hasConfiguration) {
        const [ohifService, configuration] = service;
        this.registerService(ohifService, configuration);
      } else {
        this.registerService(service);
      }
    });
  }
}
