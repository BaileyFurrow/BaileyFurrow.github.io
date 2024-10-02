---
layout: post
title: "Learning MECM Part 1: More Setup!"
category: MECM
---

{% include series.md %}

Back at it with setting up the MECM lab in Hyper-V! Last I left off, I was configuring the device sync settings.

The next step involves confirming that the devices are hybrid Entra ID joined. In my case, they weren't, so I needed to follow additional steps to continue.

Because of the Entra ID sync cycle, I had to wait a *while* before any devices would successfully register. I have experienced this wait time while working at my company's internal help desk. Sometimes, we have to perform a chassis swap for a user, and part of this process is rejoining the device in Entra ID. While I am now familiar with the `Start-ADSyncSyncCycle` PowerShell cmdlet, this is not something I can use at the help desk due to access permissions (probably for good reason).

With a couple of devices in the Azure domain, I can finally complete the setup! Well, the cloud part. I still need to configure the on-premises setup.

## On-Premises Environment Setup

Thankfully, all of these steps completed without any issues! Well, mostly no issues. First time booting the CM1 machine and launching the MECM Console, it could not connect to the site. Odd, considering that the site it needed to connect to was itself. Before attempting again, I joined the device in Azure and started the Server Manager dashboard to ensure all services were running. Attempted launching the console a second time and it came right up!

While I am familiar with the layout of the MECM console, the settings I needed to check and configure were all new to me. Exploring these has given me some insight on some of the inner workings of MECM and some things I can explore at my workplace, such as the boundary groups.

The last part of the setup involves creating test VMs, which I will leave for another day. Stay tuned!