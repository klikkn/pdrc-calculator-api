module.exports = {
    async initialize() {
      const roleCount = await strapi.query('role', 'users-permissions').count();
  
      if (roleCount > 0) {
        await this.updatePermissions();
        return;
      }
        
      const { id } = await strapi.query('role', 'users-permissions').create({
        name: 'Authenticated',
        description: 'Default role given to authenticated user.',
        type: 'authenticated',
      });

      await strapi.query('role', 'users-permissions').create({
        name: 'Public',
        description: 'Default role given to unauthenticated user.',
        type: 'public',
      });

      this.updatePermissions();

      await this.updateRole(id, {
        permissions:
          strapi.plugins["users-permissions"].config.permissions["authenticated"]
      });
    }
  };