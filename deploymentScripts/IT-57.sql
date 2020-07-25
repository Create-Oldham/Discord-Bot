UPDATE dbo.Users SET points = 0 

/*
Run this script on a database with the schema represented by:

        Database    -  This database will be modified. The scripts folder will not be modified.

to synchronize it with:

        (local)\SQL2019.DiscordBot

You are recommended to back up your database before running this script

Script created by SQL Compare version 14.2.16.16006 from Red Gate Software Ltd at 25/07/2020 16:24:03

*/
SET NUMERIC_ROUNDABORT OFF
GO
SET ANSI_PADDING, ANSI_WARNINGS, CONCAT_NULL_YIELDS_NULL, ARITHABORT, QUOTED_IDENTIFIER, ANSI_NULLS ON
GO
SET XACT_ABORT ON
GO
SET TRANSACTION ISOLATION LEVEL Serializable
GO
BEGIN TRANSACTION
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering [dbo].[Users]'
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
ALTER TABLE [dbo].[Users] ADD
[Points] [int] NULL
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering [dbo].[Users_ups]'
GO

-- ===================================================================
-- Author      : Keiran
-- Create date : 07/08/2020
-- Revised date: 
-- Description : Upsert User details
-- ===================================================================

ALTER PROCEDURE [dbo].[Users_ups]
(
    @DiscordID NVARCHAR(25),
    @ID INT = NULL,
    @Admin TINYINT = NULL
)
AS
BEGIN
    IF @ID IS NULL
       OR @ID = 0
    BEGIN
        IF NOT EXISTS (SELECT * FROM dbo.Users WHERE DiscordID = @DiscordID)
        BEGIN
            INSERT INTO [dbo].[Users]
            (
                [DiscordID],
                [Admin],
                [points]
            )
            VALUES
            (@DiscordID, @Admin, 0);
            SELECT *
            FROM [dbo].[Users]
            WHERE [ID] = SCOPE_IDENTITY();
        END;
    END;
    ELSE
    BEGIN
        UPDATE [dbo].[Users]
        SET [DiscordID] = @DiscordID,
            [Admin] = @Admin
        WHERE ([ID] = @ID);
        SELECT *
        FROM [dbo].[Users]
        WHERE [ID] = @ID;
    END;
END;
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[pointAdd]'
GO

-- ===================================================================
-- Author      : Keiran
-- Create date : 07/08/2020
-- Revised date: 
-- Description : Upsert User details
-- ===================================================================

CREATE PROCEDURE [dbo].[pointAdd]
(@DiscordID NVARCHAR(25))
AS
BEGIN
    UPDATE dbo.Users
    SET points = points + 1
    WHERE DiscordID = @DiscordID;

	SELECT points AS currentPoints FROM dbo.Users WHERE discordid = @DiscordID 
END;
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[pointClear]'
GO

-- ===================================================================
-- Author      : Keiran
-- Create date : 07/08/2020
-- Revised date: 
-- Description : Upsert User details
-- ===================================================================

CREATE PROCEDURE [dbo].[pointClear]
(@DiscordID NVARCHAR(25))
AS
BEGIN
    UPDATE dbo.Users
    SET points = 0
    WHERE DiscordID = @DiscordID;

	SELECT points AS currentPoints FROM dbo.Users WHERE discordid = @DiscordID ;
END;
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
COMMIT TRANSACTION
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
-- This statement writes to the SQL Server Log so SQL Monitor can show this deployment.
IF HAS_PERMS_BY_NAME(N'sys.xp_logevent', N'OBJECT', N'EXECUTE') = 1
BEGIN
    DECLARE @databaseName AS nvarchar(2048), @eventMessage AS nvarchar(2048)
    SET @databaseName = REPLACE(REPLACE(DB_NAME(), N'\', N'\\'), N'"', N'\"')
    SET @eventMessage = N'Redgate SQL Compare: { "deployment": { "description": "Redgate SQL Compare deployed to ' + @databaseName + N'", "database": "' + @databaseName + N'" }}'
    EXECUTE sys.xp_logevent 55000, @eventMessage
END
GO
DECLARE @Success AS BIT
SET @Success = 1
SET NOEXEC OFF
IF (@Success = 1) PRINT 'The database update succeeded'
ELSE BEGIN
	IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION
	PRINT 'The database update failed'
END
GO
