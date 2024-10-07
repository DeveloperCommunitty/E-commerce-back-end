import { Injectable } from '@nestjs/common';
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType } from "@casl/ability"; 
import { Action, User } from './actionDto/casl-action.dto';

type Subjects = 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, build } = new AbilityBuilder<Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.Role) {
      can(Action.Admin, 'all');
    } else {
      can(Action.User, 'all'); 
    }

    return build({
      detectSubjectType: (item: any) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}