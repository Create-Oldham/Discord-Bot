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

CREATE PROCEDURE [dbo].[CodeGet]
(
    @SearchTerm VARCHAR(50),
    @DiscordID VARCHAR(25)
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
            WHERE UserID = @UserID
                  AND EquipmentID = @MachineID
        )
        BEGIN
            SELECT 'success' AS result;

            SELECT EquipmentName,
                   EquipmentInstructions
            FROM dbo.Equipment
            WHERE ID = @MachineID;


        END;
        ELSE
            SELECT 'Failiure' AS result;
    END;
    ELSE
        SELECT 'invalid' AS result;

END;
GO
