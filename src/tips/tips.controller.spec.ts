import { Test, type TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { TipsController } from './tips.controller';
import { TipsService } from './tips.service';
import type { Response } from 'express';
import type { Result } from 'src/schemas/result.schema';

describe('TipsController', () => {
  let controller: TipsController;
  let service: TipsService;

  const mockResult: Result = {
    title: 'Git Stash - Save Work Temporarily',
    description: 'Learn how to temporarily save your uncommitted changes',
    content_markdown: '`git stash` is a powerful command that saves your work without committing.',
    category: 'git_command',
    examples: [
      {
        explanation: 'Save current changes with a descriptive message',
        details_markdown: '```bash\ngit stash save "WIP: feature"\n```',
      },
    ],
  };

  const mockResponse = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(async () => {
    const mockTipsService = {
      getTip: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipsController],
      providers: [
        {
          provide: TipsService,
          useValue: mockTipsService,
        },
      ],
    }).compile();

    controller = module.get<TipsController>(TipsController);
    service = module.get<TipsService>(TipsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /tips', () => {
    it('should return a git tip by default', async () => {
      const res = mockResponse();
      jest.spyOn(service, 'getTip').mockResolvedValue(mockResult);

      await controller.getTip('git_command', res);

      expect(service.getTip).toHaveBeenCalledWith('git_command');
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        status_code: HttpStatus.OK,
        result: mockResult,
      });
    });

    it('should return an editor tip when category is editor', async () => {
      const res = mockResponse();
      const editorResult: Result = { ...mockResult, category: 'editor' };
      jest.spyOn(service, 'getTip').mockResolvedValue(editorResult);

      await controller.getTip('editor', res);

      expect(service.getTip).toHaveBeenCalledWith('editor');
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        status_code: HttpStatus.OK,
        result: editorResult,
      });
    });

    it('should return a terminal tip when category is terminal', async () => {
      const res = mockResponse();
      const terminalResult: Result = { ...mockResult, category: 'terminal' };
      jest.spyOn(service, 'getTip').mockResolvedValue(terminalResult);

      await controller.getTip('terminal', res);

      expect(service.getTip).toHaveBeenCalledWith('terminal');
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        status_code: HttpStatus.OK,
        result: terminalResult,
      });
    });
  });

  describe('GET /tips/git', () => {
    it('should return a git command tip', async () => {
      const res = mockResponse();
      jest.spyOn(service, 'getTip').mockResolvedValue(mockResult);

      await controller.tipGit(res);

      expect(service.getTip).toHaveBeenCalledWith('git_command');
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        status_code: HttpStatus.OK,
        result: mockResult,
      });
    });
  });

  describe('GET /tips/editor', () => {
    it('should return an editor tip', async () => {
      const res = mockResponse();
      const editorResult: Result = { ...mockResult, category: 'editor' };
      jest.spyOn(service, 'getTip').mockResolvedValue(editorResult);

      await controller.tipEditor(res);

      expect(service.getTip).toHaveBeenCalledWith('editor');
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        status_code: HttpStatus.OK,
        result: editorResult,
      });
    });
  });

  describe('GET /tips/terminal', () => {
    it('should return a terminal tip', async () => {
      const res = mockResponse();
      const terminalResult: Result = { ...mockResult, category: 'terminal' };
      jest.spyOn(service, 'getTip').mockResolvedValue(terminalResult);

      await controller.tipTerminal(res);

      expect(service.getTip).toHaveBeenCalledWith('terminal');
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        status_code: HttpStatus.OK,
        result: terminalResult,
      });
    });
  });
});
