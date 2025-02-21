# Conciderations

## Loading pattern

### JSON

Json data are already so optimized, extremly gzip friendly and cached by the browser that manage them further would only be concidered overenginerring at this point.

If the data becomes more volotile a backend for frontend could be added that downloaded the data and then send over only the nessesary part for rendering the grid and tile.

Since all data is needed by the app eventually (show all data as JSON), the data is somewhat static, the data is cohesive (all or nothing updates, no 1 device at a time are fetchable) then loading it like this makes sence.

### Images

Small images are very well handled by the browser and disc cache resolves the image in < 1ms even on slower devices.Therefor trusting the server and cache headers set by the server is chosen in this case.
