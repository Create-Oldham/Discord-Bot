SET QUOTED_IDENTIFIER ON
GO
SET ANSI_NULLS ON
GO

-- ===================================================================
-- Author      : Keiran
-- Create date : 07/08/2020
-- Revised date: 
-- Description : Upsert Equipment details
-- ===================================================================

CREATE PROCEDURE [dbo].[EquipmentLink_ins]
(
    @SearchTerm VARCHAR(50),
    @DiscordID VARCHAR(25),
    @Admin TINYINT,
    @UID VARCHAR(25)
)
AS
BEGIN
    DECLARE @MachineID INT =
            (
                SELECT TOP (1)
                       ID
                FROM dbo.Equipment
                WHERE EquipmentName LIKE '%' + @SearchTerm + '%'
                ORDER BY ID DESC
            );
    IF @MachineID IS NOT NULL
    BEGIN
        DECLARE @UserID INT =
                (
                    SELECT TOP (1)
                           ID
                    FROM dbo.Users
                    WHERE DiscordID = @DiscordID
                    ORDER BY ID DESC
                );
        IF EXISTS
        (
            SELECT ID
            FROM dbo.UserEquipmentLink
            WHERE UserID =
            (
                SELECT TOP (1) ID FROM dbo.Users WHERE DiscordID = @UID ORDER BY ID DESC
            )
                  AND AccessLevel = 1
                  AND EquipmentID = @MachineID
        )
        BEGIN
            IF NOT EXISTS
            (
                SELECT ID
                FROM dbo.UserEquipmentLink
                WHERE UserID = @UserID
                      AND EquipmentID = @MachineID
            )
            BEGIN
                INSERT INTO dbo.UserEquipmentLink
                (
                    UserID,
                    EquipmentID,
                    AccessLevel
                )
                VALUES
                (   @UserID,    -- UserID - int
                    @MachineID, -- EquipmentID - int
                    @Admin      -- AccessLevel - int
                    );
                SELECT 'Success' AS result;
            END;
            ELSE
                SELECT 'Exists' AS result;
        END;
        ELSE
            SELECT 'Failiure' AS result;
    END;
    ELSE
        SELECT 'invalid' AS result;

END;
GO
