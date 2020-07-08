USE [DiscordBot]
GO

/****** Object:  Table [dbo].[Equipment]    Script Date: 08/07/2020 09:03:53 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Equipment](
	[ID] [INT] IDENTITY(1,1) NOT NULL,
	[EquipmentName] [NVARCHAR](40) NOT NULL,
	[EquipmentInstructions] [NVARCHAR](250) NULL
) ON [PRIMARY]
GO


USE [DiscordBot]
GO

/****** Object:  Table [dbo].[Lookup]    Script Date: 08/07/2020 09:04:13 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Lookup](
	[ID] [INT] IDENTITY(1,1) NOT NULL,
	[Name] [NVARCHAR](50) NOT NULL
) ON [PRIMARY]
GO


USE [DiscordBot]
GO

/****** Object:  Table [dbo].[UserEquipmentLink]    Script Date: 08/07/2020 09:04:22 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[UserEquipmentLink](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NOT NULL,
	[EquipmentID] [int] NOT NULL,
	[AccessLevel] [int] NOT NULL
) ON [PRIMARY]
GO

USE [DiscordBot]
GO

/****** Object:  Table [dbo].[Users]    Script Date: 08/07/2020 09:04:30 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Users](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[DiscordID] [int] NOT NULL,
	[Admin] [tinyint] NULL
) ON [PRIMARY]
GO


