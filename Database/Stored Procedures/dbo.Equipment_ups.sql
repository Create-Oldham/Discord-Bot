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

CREATE PROCEDURE [dbo].[Equipment_ups]
  (@EquipmentName nvarchar(40),@ID int=NULL,@EquipmentInstructions nvarchar(250)=NULL)
AS
BEGIN
  IF @ID IS NULL OR @ID = 0
    BEGIN
      INSERT INTO [dbo].[Equipment]
        ([EquipmentName],[EquipmentInstructions])
      VALUES
        (@EquipmentName,@EquipmentInstructions);
      SELECT * FROM [dbo].[Equipment] WHERE [ID] = SCOPE_IDENTITY();
    END
  ELSE
    BEGIN
      UPDATE [dbo].[Equipment]
        SET [EquipmentName]=@EquipmentName,[EquipmentInstructions]=@EquipmentInstructions
        WHERE ([ID] = @ID);
      SELECT * FROM [dbo].[Equipment] WHERE [ID] = @ID;
    END
END
GO
