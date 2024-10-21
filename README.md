# planka-client
Simple client for Trello generated from the Trello openapi specification using openapi-ts.

# Usage
1. Add the following dependency to `package.json`.

```json
{
  "dependencies": {
    "@gewis/planka-client": "github:GEWIS/planka-client"
  }
}
```

2. Import the desired service and call the desired endpoint, e.g.

```typescript
import { DefaultService } from '@gewis/planka-client';

DefaultService.getActionsId(...);
```
