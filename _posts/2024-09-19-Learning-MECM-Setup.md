---
layout: post
title: "Learning MECM Part 0: Setup"
category: MECM
---

Soon, I will be potentially taking on new responsibilities at my current job, as
I have shown interest in working with an IT Developer in application/update
deployment. With my extensive knowledge in PowerShell, I will excel at the role.

<!--more-->

To begin preparing, I have decided to run through [a lab kit from Microsoft
to learn more about MECM][lab-link] and how it works. Currently, I know some of
the basics that a technician would need to know to work in MECM, including
remote control access, retrieving PC information, and troubleshooting MECM
client issues. I am also familiar with other aspects of MECM, including task
sequences, the basics of the PC imaging process through PXE, viewing driver
packages, and some limited knowledge of application deployment.

> 📄 **Want to follow along?**
>
> Download the lab and follow along with the `Intune+MCM Lab Kit_lab guide.docx`
> document provided. I will *not* cover the setup document, as it mostly just
> tells you to run the installer to extract the VMs. You can also follow along
> with the [PDF version][lab-pdf] of the lab if you do not want to download 20GB
> worth of lab just for the doc.

Let's begin!

## Day 1

### Cloud/Account Setups

This lab requires quite a few free trials of different Azure resources,
including Microsoft 365, Azure AD (now known as Entra ID), Enterprise Mobility +
Security (which appears to be referred to as just Intune now), and Defender for
Business. I had to create three different users in Azure: LabAdmin, who has
Global Administrator privileges (not recommended in the real world, but fine for
a lab and makes lab setup a little easier); TU1, or Test User1; and TU2, or Test
User2. Each user also gets a license assigned for 365 and Intune.

These first few steps go fairly smoothly without too many issues. Problems begin
to arise when logging into the DC for the first time...

### Issues with Configuring Entra Connect

When setting up Entra Connect on the DC, the prerequesite steps complete without
issue. Only when I begin the install for Entra Connect that I begin running into
issues.

The installer takes about 5-10 minutes before it fails, giving me this error:

![Screenshot of error message: An error occurred executing Configure AAD Sync task: An error occurred while sending the request.][aad-sync-error]

A quick glance at the file tells me that each error that appears in the log file
contains the string `[ERROR]`. Using PowerShell, I can quickly view only the
lines in the log file that are related to an error:

![Screenshot of specific error lines from log file][pwsh-aad-error]

Most of this is useless...it mostly just says that creating the connector failed
without any explanation. So I did what any IT expert would do: search on
Google. I eventually found [a fairly new post in MS Learn Q&A][qa-aad-sync]
that contained the same errors that I received. Apparently, it attempts to
enable TLS 1.2 to complete the connection and fails to do so. To enable it
manually, multiple registry values need to be set:

![Registry edits to make to manually enable TLS 1.2][tls1-2-regedits]

When attempting to change the first registry key, I discovered that the .NET
Framework was *not* installed. I installed .NET Framework v4.8.1, added the
registry keys, and rebooted the DC. I uninstalled the Entra Connect client and
successfully reinstalled it! Finally!!

With that finally finished, it is almost 1am and I need to sleep. I will
continue this setup on Saturday.

[lab-link]: https://www.microsoft.com/en-us/evalcenter/evaluate-mem-evaluation-lab-kit
[aad-sync-error]: /assets/img/AAD-sync-error.png
[pwsh-aad-error]: /assets/img/pwsh-find-aadconnect-error.png
[qa-aad-sync]: https://learn.microsoft.com/en-us/answers/questions/2006720/an-error-occured-executing-configure-aad-sync-an-e
[tls1-2-regedits]: /assets/img/tls1-2-regedits.png
[lab-pdf]: /assets/pdf/Intune+MCM%20Lab%20Kit_lab%20guide.pdf
