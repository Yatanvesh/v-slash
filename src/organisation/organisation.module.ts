import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {OrganisationResolver} from "./organisation.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [
    OrganisationResolver,
  ],
  exports: [
    TypeOrmModule
  ]
})
export class OrganisationModule {
}
