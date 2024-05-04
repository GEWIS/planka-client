# trello-client
Simple client for Trello generated from the Trello openapi specification using openapi-ts.

# Usage
1. Add the following dependency to `package.json`.

```json
{
  "dependencies": {
    "@planka/planka-client": "github:planka/planka-client"
  }
}
```

2. Import the desired service and call the desired endpoint, e.g.

```typescript
import { DefaultService } from '@planka/planka-client';

DefaultService.getActionsId(...);
```
