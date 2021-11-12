import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin, SchemaMigrationOptions} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import { SizesRepository, SneakersRepository } from './repositories';
import { sizesSeedArray } from './resources/db_seeds/sizes.seed';
import { sneakersSeedArray } from './resources/db_seeds/sneakers.seed';
import { Sneakers } from './models';
import { AuthenticationComponent, registerAuthenticationStrategy } from '@loopback/authentication';
import { UserAuth } from './strategies/user-auth.strategy';

export {ApplicationConfig};

export class CheckoutceBackApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);
    registerAuthenticationStrategy(this, UserAuth);
    this.component(AuthenticationComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }

  async migrateSchema(options?: SchemaMigrationOptions): Promise<void> {
      await super.migrateSchema(options);

      const sizesRepository = await this.getRepository(SizesRepository);
      for(let i = 0; i < sizesSeedArray.length; i++){
        const data = sizesSeedArray[i];
        const found = await sizesRepository.findOne({where: {value: data.value}});
        if (found) {
          sizesRepository.updateById(found.id, data);
        } else {
          await sizesRepository.create(data);
        }
      }
      const sizes = await sizesRepository.find();
      const sneakersRepository = await this.getRepository(SneakersRepository);
      for(let i = 0; i < sneakersSeedArray.length; i++){
        const data = sneakersSeedArray[i];
        const found = await sneakersRepository.findOne({where: {model: data.model}});
        
        if (found) {
          await sneakersRepository.updateById(found.id, data);
          
        } else {
          const sneaker = await sneakersRepository.create(data);
          for(let j = 0; j < sizes.length; j++) {
            await sneakersRepository.sizes(sneaker.id).link(sizes[j].id);
          }
        }
      }
  }
  
}
