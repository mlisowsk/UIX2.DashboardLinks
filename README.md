# UIX2.DashboardLinks
UIXv2 sample application, ShellFrame & listing Dashboard demonstrating various ways to implement clickable links to M-Files objects

When clicked, we want to open a new M-Files client window with the M-Files object in focus, achieving what `ObjectOperations.GetMFilesURLForObject()` did for the classic desktop client.

## Build

Generate the mfappx file with Visual Studio `Build` action, then install it with M-Files Admin.

## Use

How to use:

1. Log into the vault using new web or desktop client (M-Files >= 24.10)
2. Navigate to a view and select a single M-Files object
3. Open dashboard by selecting "Show my dashboard" from the top 3-dots menu
4. The dashboard should show object type, ID and version of the selected object
5. Click any of the three links and observe behaviour

The dashboard code will print some diagnostic messages to the browser console.

Derived from: https://developer.m-files.com/Frameworks/User-Interface-Extensibility-Framework/Reference/Version2/Samples/ShellFrameAndDashboard/