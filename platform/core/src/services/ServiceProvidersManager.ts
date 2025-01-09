import { defaultLogger, Logger } from '../utils';

/**
 * The ServiceProvidersManager allows for a React context provider class to be registered
 * for a particular service. This allows for extensions to register services
 * with context providers and the providers will be instantiated and added to the
 * DOM dynamically.
 */
export default class ServiceProvidersManager {
  public providers = {};
  public logger: Logger;

  public constructor() {
    this.providers = {};
    this.logger = defaultLogger.clone('ServiceProvidersManager');
    this.logger.debug('initializing');
  }

  registerProvider(serviceName, provider) {
    if (!serviceName) {
      this.logger.warn(
        'Attempting to register a provider to a null/undefined service name. Exiting early.'
      );
      return;
    }

    if (!provider) {
      this.logger.warn('Attempting to register a null/undefined provider. Exiting early.');
      return;
    }

    this.logger.debug(`Registering provider for service: ${serviceName}`);

    this.providers[serviceName] = provider;
  }
}
