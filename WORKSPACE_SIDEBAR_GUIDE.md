# Workspace Sidebar Feature Guide

## Overview
The new Workspace Sidebar provides a modern, ClickUp-style interface for managing your workspace. Users can now choose between two layout styles:

1. **Workspace Layout** - Modern sidebar with workspace organization
2. **Classic Layout** - Traditional sidebar menu

## Features

### Workspace Sidebar Includes:
- **Workspace Header** - Displays user's workspace with dropdown menu
- **Quick Navigation** - Home, Inbox, Assigned Comments
- **My Tasks Section** - Assigned to me, Today & Overdue, Personal List
- **Favorites Section** - Quick access to favorited items
- **Spaces Section** - Organized project spaces with counts
- **Invite & Upgrade** - Team collaboration options

### How to Switch Layouts

Users can switch between layouts in two ways:

1. **Via Account Settings:**
   - Navigate to Profile → Account Settings
   - Click on "Layout Settings" tab
   - Choose between "Workspace" or "Classic" layout
   - Changes apply immediately

2. **Programmatically:**
   ```javascript
   import { setLayoutType } from './redux/action/Theme';
   
   // Switch to workspace layout
   setLayoutType('workspace');
   
   // Switch to classic layout
   setLayoutType('classic');
   ```

## Files Created/Modified

### New Files:
- `/src/layout/Sidebar/WorkspaceSidebar.jsx` - Main workspace sidebar component
- `/src/layout/Sidebar/workspace-sidebar.scss` - Workspace sidebar styles
- `/src/layout/MainLayout/WorkspaceLayout/index.jsx` - Workspace layout wrapper
- `/src/layout/MainLayout/WorkspaceLayout/workspace-layout.scss` - Layout styles
- `/src/components/LayoutSwitcher/index.jsx` - Layout switcher component
- `/src/components/LayoutSwitcher/layout-switcher.scss` - Switcher styles

### Modified Files:
- `/src/routes/AppRoutes.jsx` - Added layout switching logic
- `/src/configs/ThemeConfig.js` - Added layoutType configuration
- `/src/redux/constants/Theme.js` - Added SET_LAYOUT_TYPE constant
- `/src/redux/action/Theme.js` - Added setLayoutType action
- `/src/redux/reducer/Theme.js` - Added layout type reducer
- `/src/views/Profiles/Account/index.jsx` - Added Layout Settings tab

## Customization

### Modify Workspace Menu Items
Edit `/src/layout/Sidebar/WorkspaceSidebar.jsx`:

```javascript
const mainMenuItems = [
    { name: 'Home', icon: <Home size={18} />, path: '/dashboard', badge: null },
    { name: 'Inbox', icon: <Inbox size={18} />, path: '/apps/inbox', badge: null },
    // Add more items here
];
```

### Modify Spaces
```javascript
const spacesItems = [
    { name: 'Project Name', icon: <Layout size={16} />, path: '/path', count: '3', color: 'primary' },
    // Add more spaces here
];
```

### Styling
- Dark theme: Default workspace styling
- Light theme: Automatically switches to light mode based on `data-menu="light"` attribute
- Custom colors: Edit `/src/layout/Sidebar/workspace-sidebar.scss`

## User Experience

### On Login:
- Default layout is set to "workspace" (configurable in ThemeConfig.js)
- User's workspace name displays in sidebar header
- All menu items are personalized and user-specific

### Responsive Design:
- **Desktop (>1200px):** Sidebar always visible (280px width)
- **Mobile (<1200px):** Sidebar hidden by default, toggle with menu button
- Backdrop overlay on mobile when sidebar is open

### Navigation:
- Single-click navigation to pages
- Active page highlighting
- Badge indicators for counts and notifications
- Collapsible sections (My Tasks, Spaces)

## Integration with Authentication

To personalize the workspace for logged-in users, pass the user's name to the WorkspaceSidebar:

```javascript
// In WorkspaceLayout component
<WorkspaceSidebar userName={currentUser.name} />
```

You can also fetch user-specific data and customize:
- Workspace name
- User tasks and counts
- User's spaces and projects
- Favorites

## Theme Support

The workspace sidebar supports both light and dark themes:
- Automatically detects `data-menu="light"` or `data-menu="dark"` attribute
- Smooth transitions between themes
- Consistent with overall app theme

## Future Enhancements

Potential features to add:
- Drag-and-drop space reordering
- Custom workspace colors/branding
- Workspace switching for multi-workspace users
- Real-time notification badges
- Search within workspace
- Keyboard shortcuts

## Support

For issues or questions, refer to the component files or modify as needed for your specific use case.
