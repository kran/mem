---
layout: post
title: Hello MUD !
category: Test
---
```lua
local l = require'lpeg'

local space = l.P' '
local patt = l.Ct( ( l.C( ( 1 - space )^1 ) + space^1  ) ^ 0 )
local matches = patt:match('who is mud ? ')

for _, m in ipairs(matches) do
    print(m)
end
```

![MUD](https://unsplash.it/600/400/?random)


after breaker;
