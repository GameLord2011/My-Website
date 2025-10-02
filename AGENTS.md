# AI AGENT CONFIGURATION

- Make sure that all imports from the same module are seperate, here is an example:

```tsx
import { useEffect, useState } from react; //NO, DO NOT DO THIS

//do this instead
import { useEffect } from react;
import { useState } from react;
```

I don't know why, but this makes it much faster.

- Remind the user to add their date of birth to .env.local if they have not
- do not mess with the tailwindcss implementation, it is already unstable as-is
- scripts/gensitemap.js is for generation of the sitemap xml
- make sure to run `pnpm run prettier` for code formatting
- Oh, also, this project uses pnpm as it uses symlinks to a module store.
- Please don't mess with the CSS.
