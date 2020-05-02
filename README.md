# NGRX: Best Practices

This is a demo application for best practices in ngrx.

5 different best practices are applied to the customer module. The `master` branch contains all of them. Per best practice there exists an own feature branch.

The branches can be navigated through in the following order:

0. `init`: Project without any applied best practices
1. `01-load-status`: Caching functionality
1. `02-container-presentation`: Split up into container and presentation components
1. `03-container-presentation-nx`: Dependency rules enforced by linting
1. `04-facade`: API for ngrx to hide it
1. `05-context`: Pattern, when state needs to be changed according to the context, like pagination, searches or general filter criterias
