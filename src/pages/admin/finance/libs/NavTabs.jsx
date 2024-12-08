import { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';

import LinkTab from './LinkTab';

export default function NavTabs({label, path}) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    // event.type can be equal to focus with selectionFollowsFocus.
    if (
      event.type !== 'click' ||
      (event.type === 'click' && samePageLinkNavigation(event))
    ) {
      setValue(newValue);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        role="navigation"
      >
        <LinkTab label="Page One" href="/drafts" />
        <LinkTab label="Page Two" href="/trash" />
        <LinkTab label="Page Three" href="/spam" />
      </Tabs>
    </Box>
  );
}
