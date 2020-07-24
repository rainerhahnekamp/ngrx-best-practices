# NGRX: Best Practices

This is a demo application for best practices in ngrx.

5 different best practices are applied to the customer module. The `master` branch contains all of them. Per best practice there exists an own feature branch.

The branches can be navigated through in the following order:

1. `init`: Project without any applied best practices
2. `01-load-status`: Caching functionality
3. `02-container-presentation`: Split up into container and presentation components
4. `02-container-presentation-nx`: Dependency rules enforced by linting
5. `03-routing`: Dealing with redirection after certain actions are finished
6. `04-facade`: API for ngrx to hide it
7. `05-context`: Pattern, when state needs to be changed according to the context, like pagination, searches or general filter criterias
8. `05-context-cache`: Context Pattern with advanced caching
9. `06-view-model`: Incompatible data structure between State and Component
10. `07-nested-components`: Multiple levels of components where container and feature modules have a cyclic dependency.
