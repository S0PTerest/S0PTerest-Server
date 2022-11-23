/*
  Warnings:

  - A unique constraint covering the columns `[boardId,pinId]` on the table `BoardPin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[noteId,pinId]` on the table `NotePin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BoardPin_boardId_pinId_key" ON "BoardPin"("boardId", "pinId");

-- CreateIndex
CREATE UNIQUE INDEX "NotePin_noteId_pinId_key" ON "NotePin"("noteId", "pinId");
